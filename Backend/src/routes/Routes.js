const express = require("express");
const router = express.Router();
const Carro = require('../models/carro');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Registro = require('../models/registro');
const registros = require('./mocks/registros.js');
const clientes = require('./mocks/clients.js');
const users = require('./mocks/user.js');
const cars = require('./mocks/cars.js');

router.use(express.json());

router.get("/cars", (req, res) => {
  res.json(cars);
});


router.post("/cars", (req, res) => {
  const car = req.body;
  cars.push(car);
  res.status(201).json(car);
});


router.put('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCar = req.body;

  const index = cars.findIndex(car => car.id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...updatedCar };
    res.json(cars[index]);
  } else {
    res.status(404).json({ message: 'Carro não encontrado' });
  }
});

router.post("/newCars", auth, (req, res) => {
  const car = req.body;
  console.log("Novo carro para análise:", car);
  res.status(201).send("Carro recebido para análise");
});


router.get("/registros", (req, res) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const registrosUsuario = registros.filter(registro => registro.id === userId);

    if (registrosUsuario.length === 0) return res.status(404).json({ msg: 'Registro não encontrado' });

    const cliente = clientes.find(cliente => cliente.id === userId);

    if (!cliente) return res.status(404).json({ msg: 'Cliente não encontrado' });

    const registrosComNome = registrosUsuario.map(registro => ({
      ...registro,
      nome: cliente.nome
    }));

    res.json(registrosComNome);
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
});


router.get('/clientesCars', auth, (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const carroUsuario = cars.find(car => car.id === userId);

    if (!carroUsuario) {
      return res.status(404).json({ msg: 'Nenhum carro encontrado para este usuário' });
    }

    res.json(carroUsuario);
  } catch (err) {
    console.error("Error:", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
});


router.get('/clientes', auth, (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const dadosCliente = clientes.find(cliente => cliente.id === userId);

    if (!dadosCliente) {
      return res.status(404).json({ msg: 'Nenhum cliente encontrado para este usuário' });
    }

    res.json(dadosCliente);
  } catch (err) {
    console.error("Error:", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
});


router.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const clienteId = parseInt(id, 10);

  const clienteIndex = clientes.findIndex(cliente => cliente.id === clienteId);

  if (clienteIndex !== -1) {
    clientes[clienteIndex] = { ...clientes[clienteIndex], ...updatedData };
    res.status(200).json(clientes[clienteIndex]);
  } else {
    res.status(404).json({ message: 'Cliente não encontrado' });
  }
});


router.post("/clientes", auth, (req, res) => {
  const { nome, email, cpf, telefone, endereco, dataNasc, cnh, senha } = req.body;
  
  if (!nome || !email || !cpf || !telefone || !endereco || !dataNasc || !cnh || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const novoCliente = { nome, email, cpf, telefone, endereco, dataNasc, cnh, senha };
  clientes.push(novoCliente);
  
  res.status(201).json(novoCliente);
});

router.post('/newClientes', async (req, res) => {
  const cliente = req.body;
  console.log("E-mail enviado para confirmação:", cliente);
  res.status(201).send("Cliente recebido para confirmação");
});

router.post("/registros", auth, (req, res) => {
  const registro = req.body;

  if (!registro.nome || !registro.carro || !registro.quantDias || !registro.valorDiario) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const novoRegistro = { id: req.user.id, ...registro }; 
    registros.push(novoRegistro); 
    res.status(201).json(novoRegistro);
  } catch (error) {
    console.error("Erro ao adicionar registro:", error.message);
    res.status(500).json({ message: "Erro ao adicionar registro" });
  }
});



router.put("/registros/:id", auth, (req, res) => {
  const { id } = req.params;
  const { diasAdicionais } = req.body;

  const registroIndex = registros.findIndex(
    (r) => r.id === parseInt(id, 10) // Verifique se o tipo está correto
  );

  if (registroIndex !== -1) {
    registros[registroIndex].quantDias += diasAdicionais;
    registros[registroIndex].status = "Alugado";
    res.json(registros[registroIndex]);
  } else {
    res.status(404).json({ message: "Registro não encontrado" });
  }
});


router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const cliente = clientes.find(c => c.email === email && c.senha === senha);

  if (cliente) {
    const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Email ou senha inválidos' });
  }
});


router.post("/clientes/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ msg: "Falha no login. Verifique suas credenciais." });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Falha no login. Verifique suas credenciais." });
  }

  const token = jwt.sign({ user: { id: user.id, email: user.email } }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: { id: user.id, email: user.email } });
});


router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = users.find(user => user.email === email);
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = { id: users.length + 1, name, email, password: hashedPassword };
      users.push(user);

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = users.find(user => user.email === email);
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);



module.exports = router;
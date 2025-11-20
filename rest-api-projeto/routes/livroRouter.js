const express = require('express');
const bodyParser = require('body-parser');
const Livros = require('../models/livros');

const livroRouter = express.Router();
livroRouter.use(bodyParser.json());

livroRouter.route('/')
.get(async (req, res, next) => {
  try {
    const livros = await Livros.find({}).populate('autor');
    res.json(livros);
  } catch (err) {
    next(err);
  }
})
.post(async (req, res, next) => {
  try {
    const livro = await Livros.create(req.body);
    console.log('Livro criado');
    res.status(201).json(livro);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await Livros.deleteMany({});
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

livroRouter.route('/:livroId')
.get(async (req, res, next) => {
  try {
    const livro = await Livros.findById(req.params.livroId).populate('autor');
    res.json(livro);
  } catch (err) {
    next(err);
  }
})
.put(async (req, res, next) => {
  try {
    const livro = await Livros.findByIdAndUpdate(
      req.params.livroId,
      { $set: req.body },
      { new: true }
    );
    res.json(livro);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await Livros.findByIdAndDelete(req.params.livroId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

module.exports = livroRouter;
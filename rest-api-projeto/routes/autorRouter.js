const express = require('express');
const bodyParser = require('body-parser');
const Autores = require('../models/autor');

const autorRouter = express.Router();
autorRouter.use(bodyParser.json());

autorRouter.route('/')
.get(async (req, res, next) => {
  try {
    const autores = await Autores.find({});
    res.json(autores);
  } catch (err) {
    next(err);
  }
})
.post(async (req, res, next) => {
  try {
    const autor = await Autores.create(req.body);
    console.log('Autor criado');
    res.status(201).json(autor);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await Autores.deleteMany({});
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

autorRouter.route('/:autorId')
.get(async (req, res, next) => {
  try {
    const autor = await Autores.findById(req.params.autorId);
    res.json(autor);
  } catch (err) {
    next(err);
  }
})
.put(async (req, res, next) => {
  try {
    const autor = await Autores.findByIdAndUpdate(
      req.params.autorId,
      { $set: req.body },
      { new: true }
    );
    res.json(autor);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await Autores.findByIdAndDelete(req.params.autorId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

module.exports = autorRouter;

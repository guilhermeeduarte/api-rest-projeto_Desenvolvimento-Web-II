const express = require('express');
const bodyParser = require('body-parser');
const CDs = require('../models/cds');

const cdRouter = express.Router();
cdRouter.use(bodyParser.json());

cdRouter.route('/')
.get(async (req, res, next) => {
  try {
    const cds = await CDs.find({}).populate('autor');
    res.json(cds);
  } catch (err) {
    next(err);
  }
})
.post(async (req, res, next) => {
  try {
    const cd = await CDs.create(req.body);
    console.log('CD criado');
    res.status(201).json(cd);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await CDs.deleteMany({});
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

cdRouter.route('/:cdId')
.get(async (req, res, next) => {
  try {
    const cd = await CDs.findById(req.params.cdId).populate('autor');
    res.json(cd);
  } catch (err) {
    next(err);
  }
})
.put(async (req, res, next) => {
  try {
    const cd = await CDs.findByIdAndUpdate(
      req.params.cdId,
      { $set: req.body },
      { new: true }
    );
    res.json(cd);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await CDs.findByIdAndDelete(req.params.cdId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

module.exports = cdRouter;
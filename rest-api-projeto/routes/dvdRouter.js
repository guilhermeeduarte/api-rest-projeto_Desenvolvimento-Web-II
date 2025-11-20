const express = require('express');
const bodyParser = require('body-parser');
const DVDs = require('../models/dvds');

const dvdRouter = express.Router();
dvdRouter.use(bodyParser.json());

dvdRouter.route('/')
.get(async (req, res, next) => {
  try {
    const dvds = await DVDs.find({}).populate('autor');
    res.json(dvds);
  } catch (err) {
    next(err);
  }
})
.post(async (req, res, next) => {
  try {
    const dvd = await DVDs.create(req.body);
    console.log('DVD criado');
    res.status(201).json(dvd);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await DVDs.deleteMany({});
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

dvdRouter.route('/:dvdId')
.get(async (req, res, next) => {
  try {
    const dvd = await DVDs.findById(req.params.dvdId).populate('autor');
    res.json(dvd);
  } catch (err) {
    next(err);
  }
})
.put(async (req, res, next) => {
  try {
    const dvd = await DVDs.findByIdAndUpdate(
      req.params.dvdId,
      { $set: req.body },
      { new: true }
    );
    res.json(dvd);
  } catch (err) {
    next(err);
  }
})
.delete(async (req, res, next) => {
  try {
    const resp = await DVDs.findByIdAndDelete(req.params.dvdId);
    res.json(resp);
  } catch (err) {
    next(err);
  }
});

module.exports = dvdRouter;
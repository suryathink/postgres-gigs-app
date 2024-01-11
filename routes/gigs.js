const express = require("express");
const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Gig = require("../models/Gig");

const Op = Sequelize.Op;
const router = express.Router();
// get all gigs
router.get("/", async (req, res) => {
  try {
    const { term } = req.query;

    if (term) {
      const data = await Gig.findAll({
        where: {
          technologies: {
            [Op.like]: `%${term}%`
          }
        }
      });

      res.send(data);
    } else {
      const gigs = await Gig.findAll();
      res.send(gigs);
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});



// add a gig
router.post("/add", async (req, res) => {
  console.log("req.body", req.body);
  try {
    let { title, technologies, budget, description, contact_email } = await req.body;
    //   Insert into table

    await Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    });

    // res.redirect('/gigs')
    res.send("OK");
  } catch (error) {
    console.log(error);
  }
});

// Update a gig
router.put("/update/:id", async (req, res) => {
  try {
    const gigId = req.params.id;
    const { title, technologies, budget, description, contact_email } = req.body;

    // Checks if that gig with that id present or not, if not present sends error message
    const gig = await Gig.findByPk(gigId);

    if (!gig) {
      return res.status(404).send({
        message: "Gig not found"
      });
    }


    await gig.update({
      title,
      technologies,
      budget,
      description,
      contact_email,
    });

    res.send({
      message: "Gig updated successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});


// Delete 
router.delete("/delete/:id", async (req, res) => {
  try {
    const gigId = req.params.id;

    // checking whether that particular gig is present or not 
    const gig = await Gig.findByPk(gigId);

    if (!gig) {
      return res.status(404).send({
        message: "Gig not found"
      });
    }

    await gig.destroy();

    res.send({
      message: "Gig deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});


module.exports = router;

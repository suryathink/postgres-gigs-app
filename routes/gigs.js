const express = require("express");
const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Gig = require("../models/Gig");

const Op = Sequelize.Op;
const router = express.Router();

// get all gigs
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    if (search) {
      const data = await Gig.findAll({
        where: {
          technologies: {
            [Op.like]: `%${search}%`,
          },
        },
      });

      if (data.length === 0) {
        return res.status(404).send({
          message: "No Data With this Query Found",
        });
      }
      console.log("data", data);
      res.send(data);
    } else {
      const gigs = await Gig.findAll();
      res.send(gigs);
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

// add a gig
router.post("/add", async (req, res) => {
  try {
    let { title, technologies, budget, description, contact_email } = req.body;

    if (!title || !technologies || !budget || !description || !contact_email) {
      return res.status(404).send({
        message: "Bad request ,All Fields Are Required",
      });
    }

    const data = await Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email,
    });

    res.send({
      message: "Data Added Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

// Update a gig
router.put("/update/:id", async (req, res) => {
  try {
    const gigId = req.params.id;
    const { title, technologies, budget, description, contact_email } =
      req.body;

    // checking wheather that gig is present or not, if not sends error message
    const gig = await Gig.findByPk(gigId);

    if (!gig) {
      return res.status(404).send({
        message: "Gig not found",
      });
    }

    if (!title || !technologies || !budget || !description || !contact_email) {
      return res.status(404).send({
        message: "Bad request ,All Fields Are Required",
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
      message: "Gig updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // checking whether that particular gig is present or not
    const gig = await Gig.findByPk(id);

    if (!gig) {
      return res.status(404).send({
        message: "Gig not found",
      });
    }

    await gig.destroy();

    res.status(200).send({
      message: "Gig deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

module.exports = router;

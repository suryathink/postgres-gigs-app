const express = require("express");
const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Gig = require("../models/Gig");

const {
  validateGigFields,
  validateGigID,
  validateUpdateFields,
} = require("../middlewares/validateGigsFields");

const {
  getAllGigs,
  createGig,
  updateGig,
  deleteGig,
  getGigsOnConditions,
} = require("../service/gig");
const Op = Sequelize.Op;
const router = express.Router();

// get all gigs
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    if (search) {
      const data = await getGigsOnConditions({
        where: {
          technologies: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      
      // const data = await Gig.findAll({
      //   where: {
      //     technologies: {
      //       [Op.like]: `%${search}%`,
      //     },
      //   },
      // });

      if (data.length === 0) {
        return res.status(404).send({
          message: "No Data With this Query Found",
        });
      }
      res.send(data);
    } else {
      const gigs = await getAllGigs();
      res.send(gigs);
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

// add a gig
router.post("/add", validateGigFields, async (req, res) => {
  try {
    let { title, technologies, budget, description, contact_email } = req.body;

    const data = await createGig({
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
router.put("/update/:id", validateUpdateFields, async (req, res) => {
  try {
    const { title, technologies, budget, description, contact_email } =
      req.body;

    const data = await updateGig({
      title,
      technologies,
      budget,
      description,
      contact_email,
    });

    res.send({
      message: "Gig updated successfully",
      data: data.dataValues,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong in /update/:id route",
    });
  }
});

// Delete
router.delete("/delete/:id", validateGigID, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteGig(id);

    res.status(200).send({
      message: "Gig deleted successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

module.exports = router;

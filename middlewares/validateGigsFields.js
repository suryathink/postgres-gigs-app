const Gig = require("../models/Gig");
const { getGigById } = require("../service/gig");

const validateGigFields = async (req, res, next) => {
  try {
    let { title, technologies, budget, contact_email } = req.body;

    if (!title || !technologies || !budget || !contact_email) {
      return res.status(404).send({
        message:
          "Bad request! Title,Technologies,Budget,contact_email fields are Required",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

const validateGigID = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number(id);

    const gig = await getGigById(id);

    if (!gig) {
      return res.status(404).send({
        message: "Gig not found",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

// const validateUpdateFields = async (req, res, next) => {
//   try {
//     let { id } = req.params;
//     id = Number(id)

//     const gig = await getGigById(id);

//     if (!gig) {
//       return res.status(404).send({
//         message: "Gig not found",
//       });
//     }

//     if (
//       gig._previousDataValues.title !== gig.dataValues.title ||
//       gig._previousDataValues.technologies !== gig.dataValues.technologies ||
//       gig._previousDataValues.description !== gig.dataValues.description ||
//       gig._previousDataValues.budget !== gig.dataValues.budget ||
//       gig._previousDataValues.contact_email !== gig.dataValues.contact_email
//     ) {
//       return res.status(404).send({
//         message: "No New Data to Update",
//       });
//     }

//     next();
//   } catch (error) {
//     res.status(500).send({
//       message: "Something went wrong From validateUpdateFields Middleware",
//     });
//   }
// };

// validateUpdateFields middleware
const validateUpdateFields = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number(id);
    const gig = await getGigById(id);
       
    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }
    
    if (
      gig._previousDataValues.title === req.body.title &&
      gig._previousDataValues.technologies === req.body.technologies &&
      gig._previousDataValues.description === req.body.description &&
      gig._previousDataValues.budget === req.body.budget &&
      gig._previousDataValues.contact_email === req.body.contact_email
    ) {
      return res.status(404).send({
        message: "No New Data to Update",
      });
    }

    next();
  } catch (error) {
    console.error("Error in validateUpdateFields middleware:", error);
    res.status(500).json({
      message: "Something went wrong from validateUpdateFields Middleware",
    });
  }
};

module.exports = { validateGigFields, validateGigID, validateUpdateFields };

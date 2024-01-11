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
  getGigsOnConditions,
} = require("../service/gig");

const { createGigController, updateGigController ,deleteGigController,getGigsController} = require("../controller/gigController");

const Op = Sequelize.Op;
const router = express.Router();

// get all gigs with search 

// router.get("/", async (req, res) => {
//   try {
//     const { search } = req.query;

//     if (search) {
//       const data = await getGigsOnConditions({
//         where: {
//           [Op.or]: [
//             {
//               title: {
//                 [Op.iLike]: `%${search}%`,
//               },
//             },
//             {
//               technologies: {
//                 [Op.iLike]: `%${search}%`,
//               },
//             },
//             {
//               description: {
//                 [Op.iLike]: `%${search}%`,
//               },
//             },
//           ],
//         },
//       });

//       if (data.length === 0) {
//         return res.status(404).send({
//           message: "No Data With this Query Found",
//         });
//       }
//       res.send(data);
//     } else {
//       const gigs = await getAllGigs();
//       res.send(gigs);
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: "Something went wrong",
//     });
//   }
// });

router.get("/",getGigsController)

// add a gig
router.post("/add", createGigController);

// Update a gig
router.put("/update/:id", validateUpdateFields, updateGigController);

// Delete
router.delete("/delete/:id", validateGigID, deleteGigController);

module.exports = router;

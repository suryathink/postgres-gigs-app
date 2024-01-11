const Gig = require("../models/Gig");

const getAllGigs = async () => {
  return await Gig.findAll();
};

const getGigsOnConditions = async (conditions)=>{
 return await Gig.findAll(conditions)
}

const getGigById = async (id) => {
  return await Gig.findByPk(id);
};

const createGig = async (gigData) => {
  return await Gig.create(gigData);
};

const updateGig = async (gigData) => {
  return await Gig.update(gigData);
};

const deleteGig = async (gigID) => {
  try {
    await Gig.destroy({
      where: {
        id: gigID,
      },
    });
  } catch (error) {
    console.error(error);
  }
};



module.exports = {
  getAllGigs,
  getGigById,
  createGig,
  updateGig,
  deleteGig,
  getGigsOnConditions
};

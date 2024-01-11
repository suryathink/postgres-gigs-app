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

const updateGig = async (id, updatedData) => {
  try {
    const [rowsUpdated] = await Gig.update(updatedData, {
      where: {
        id: id,
      },
    });

    return rowsUpdated > 0;
  } catch (error) {
    console.error("Error in updateGig:", error);
    return false;
  }
};


const deleteGig = async (gigID) => {
  try {
    await Gig.destroy({
      where: {
        id: gigID,
      },
    });
    return true
  } catch (error) {
    console.error(error);
    return false
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

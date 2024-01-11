const { Op } = require("sequelize");
const gigService = require("../service/gig");

const getGigsController = async (req, res) => {
  try {
    const { search } = req.query;

    if (search) {
      const data = await gigService.getGigsOnConditions({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              technologies: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      });

      if (data.length === 0) {
        return res.status(404).send({
          message: "No Data With this Query Found",
        });
      }
      res.send(data);
    } else {
      const gigs = await gigService.getAllGigs();
      res.send(gigs);
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong here",
    });
  }
};

const createGigController = async (req, res) => {
  const { title, technologies, description, budget, contact_email } = req.body;

  try {
    const newGig = await gigService.createGig({
      title,
      technologies,
      description,
      budget,
      contact_email,
    });
    return res.status(201).json(newGig);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateGigController = async (req, res) => {
  try {
    let { id } = req.params;
    const { title, technologies, description, budget, contact_email } =
      req.body;
    const updated = await gigService.updateGig(Number(id), {
      title,
      technologies,
      description,
      budget,
      contact_email,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Gig not found or no changes to update" });
    }

    return res.status(200).json({ message: "Gig updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteGigController = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await gigService.deleteGig(Number(id));

    if (data) {
      res.status(200).send({
        message: "Gig deleted successfully",
      });
    } else {
      res.status(400).send({
        message: "Gig deletion Failed",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createGigController,
  updateGigController,
  deleteGigController,
  getGigsController,
};

import responseHandler from "../middlewares/response.handler";
import tmdbApi from "../api/tmdb.api";

const personDetials = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await tmdbApi.personDetails({ personId });

    responseHandler.ok(res, person);
  } catch {
    responseHandler.serverError(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;
    const medias = await tmdbApi.personMedias({ personId });
    responseHandler.ok(res, medias);
  } catch {
    responseHandler.serverError(res);
  }
};

export default {
  personDetials,
  personMedias,
};

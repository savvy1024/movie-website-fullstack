import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

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

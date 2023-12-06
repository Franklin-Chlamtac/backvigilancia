import getSessionService from "../services/get-session-service";
import { ResponseMessages } from "../utils/response-messages";

export default {
  async handler(req, res) {
    const { id } = req.user;

    const user = await getSessionService.handler({ id });

    if (!user) {
      return res.status(404).json({ message: ResponseMessages.NOT_FOUND });
    }

    return res.json({ user });
  },
};

import jwt from "jsonwebtoken";

export const authArtistMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "Unauthorized Access!" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "user" && decoded.role !== "artist") {
      return res.status(403).json({ message: "Unauthorized Access!" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateDoctor = async (req, res, next) => {
    const doctorId = req.headers["doctor-id"];
  
    if (!doctorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    req.doctorId = doctorId;
    next();
  };
  
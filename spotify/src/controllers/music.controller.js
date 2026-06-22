import mongoose from "mongoose";
import uploadFile from "../services/storage.service.js";
import musicModel from "../models/music.model.js";
import albumModel from "../models/album.model.js";
import jwt from 'jsonwebtoken'
export const createMusic = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'artist') {
      return res.status(403).json({ message: "Unauthorized Access!" });
    }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      title,
      artist: decoded.id,
      uri: result.url,
    });
    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const createAlbum = async (req,res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'artist') {
      return res.status(403).json({ message: "Unauthorized Access!" });
    }

    const {title, musics} = req.body
    const album = await albumModel.create({
      title,
      artist: decoded.id,
      musics: musics
    })

    res.status(201).json({
      message: "Album Created",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        music: album.musics
      }
    })











  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ message: "Unauthorized" });
  }
}
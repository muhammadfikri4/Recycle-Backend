import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import {database} from '../../firebase-init'
import { Response } from 'express';

@Controller('/testing')
export class TestingController {
    private db: FirebaseFirestore.Firestore
    constructor(){
        this.db = database()
    }

    @Post()
  async addData(@Body() data:{name: string, email: string, password: string},@Res() res:Response) {
    const users = this.db.collection('users')
    const userData = await users.add({
        name: data.name,
        email: data.email,
        password: data.password
    })
    return res.status(200).json({message: "Add Data Success", data: userData})
  }
    @Get()
  async getData(@Res() res:Response) {
    try {
      const users = this.db.collection('users')
    // const allData = (await users.get()).docs.map((doc) => doc.data());
    const allData = await users.where('email', '==', "reihanbotak@gmail.com").limit(1).get();

    if(allData.empty) {
      return res.status(404).json({message: "User Not Found"})
    }
    const getUser = allData.docs[0].data()
  return res.status(200).json({message: "Get Data Success", data: getUser})
    
  } catch(error) {
      return res.status(404).json({error})
  }
  
}}
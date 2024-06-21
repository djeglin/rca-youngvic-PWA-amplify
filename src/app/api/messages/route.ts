'use server'
import { NextResponse } from 'next/server';
import Axios from 'axios'
import { Amplify } from "aws-amplify";

Amplify.configure({})

// Handles POST requests to /api/messages
export async function POST (request: Request) {
    const API_URL = 'https://zvi1mh9s4a.execute-api.eu-west-3.amazonaws.com/dev/messages';
    const requestBody = await request.json();
    console.log("REQUEST BODY ==>", requestBody)
    const response = await Axios.post(API_URL, requestBody);
    console.log("RESPONSE ==>", response.data)
    return NextResponse.json(response.data);
}
 
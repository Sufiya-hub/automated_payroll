import { NextResponse } from 'next/server';
import { addEmployee, getAllEmployees } from '@/server/queries';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function GET() {
  try {
    // console.log('GOT THE GET REQ FOR /api/employess');
    const data = await getAllEmployees();
    return NextResponse.json({ message: 'success', data });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

async function fileToBuffer(file) {
  const reader = file.stream().getReader();
  const chunks = [];

  let { done, value } = await reader.read();
  while (!done) {
    chunks.push(value); // Collect each chunk
    ({ done, value } = await reader.read());
  }

  return Buffer.concat(chunks); // Convert chunks to a single Buffer
}

export async function POST(req) {
  try {
    const body = await req.formData();
    let extractedData = {};
    for (const [key, value] of body.entries()) {
      extractedData[key] = value;
    }
    let { data, employeeImage } = extractedData;
    data = JSON.parse(data);
    console.log(employeeImage);
    const dirPath = path.join(process.cwd(), 'public/employees');

    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Generate unique file name
    const newFileName = `image-${Date.now()}-${employeeImage.name}`;
    const filePath = path.join(dirPath, newFileName);

    fileToBuffer(employeeImage).then((buffer) => {
      fs.writeFileSync(filePath, buffer);
    });
    // Convert `employeeImage` to a Buffer
    // fs.writeFileSync(filePath, Buffer.from(employeeImage));
    // fs.renameSync(employeeImage.filepath, filePath);

    data.image = newFileName;
    // console.log('body:', data);

    const contactData = {
      name: data.fullName,
      email: data.email,
      contact: data.mobile,
      type: 'employee',
      reference_id: 'Acme Contact ID 12345',
      notes: {
        notes_key_1: 'Employee',
      },
    };

    const auth = Buffer.from(
      `${process.env.RAZORPAY_TEST_ID}:${process.env.RAZORPAY_SECRET}`
    ).toString('base64');

    await axios
      .post('https://api.razorpay.com/v1/contacts', contactData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
      })
      .then((response) => {
        console.log('Success:', response.data);
        if (response.data.id) data.contact_id = response.data.id;
        console.log('data:', data);
        // return NextResponse.json({ response });
      })
      .catch((error) => {
        console.error(
          'Error:',
          error.response ? error.response.data : error.message
        );
      });

    const res = await addEmployee(data);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}

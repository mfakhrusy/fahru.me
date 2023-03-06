import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { z } from 'zod';

import { baseURL } from '@/constant/env';

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

type Body = z.infer<typeof bodySchema>;

function isValidBody(body: unknown): body is Body {
  return bodySchema.safeParse(body).success;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isValidBody(req.body)) {
    return res.status(400).json({ data: 'Username or password not found 1' });
  }

  // Get data submitted in request's body.
  const body = req.body;

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.username || !body.password) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Username or password not found 2' });
  }

  const params = new URLSearchParams();
  params.append('username', body.username);
  params.append('password', body.password);

  const result = fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  // Found the name.
  // Sends a HTTP success code
  // res.status(200).json({ data: `ok` })
  res.setHeader('Set-Cookie', 'loggedIn=true; Path=/');
  res.redirect('/');
}

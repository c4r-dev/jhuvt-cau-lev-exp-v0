// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import data from '../public/data.json';

export default function Home() {

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
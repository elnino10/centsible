export const sanitizeData = (data: any): any => {
  if (data instanceof Date) {
    return data.toISOString();
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  } else if (typeof data === 'object' && data !== null) {
    const sanitizedObject: any = {};
    for (const key in data) {
      if (key !== 'password' && key !== 'token' && key !== 'refreshToken' && key !== 'accessToken') {
        sanitizedObject[key] = sanitizeData(data[key]);
      }
    }

    return sanitizedObject;
  }

  return data;
}
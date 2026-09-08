export const sanitizeData = (data: any): object | [] | Promise<any[] | {}> => {
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  } else if (typeof data === 'object' && data !== null) {
    const sanitizedObject: any = {};
    for (const key in data) {
      if (key !== 'password' && key !== 'token' && key !== 'refreshToken' && key !== 'accessToken') {
        sanitizedObject[key] = sanitizeData(data[key]);
      }
      if (key === 'created_at' && data[key] instanceof Date) {
        sanitizedObject[key] = data[key].toISOString();
      }
    }
    return sanitizedObject;
  }
  return data;
}
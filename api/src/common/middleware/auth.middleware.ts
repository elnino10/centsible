// export class AuthMiddleware {
//   use(req: any, res: any, next: () => void) {
//     // Check if the request has an authorization header
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Extract the token from the authorization header
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Verify the token (you can use a library like jsonwebtoken for this)
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Attach the decoded user information to the request object
//       next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//   }
// }
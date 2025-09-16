import { Router, type Request, type Response } from 'express'
import { getUsers, getUser, createUser, updateUsers, deleteUsers} from '../controllers/users.ts'
import { validateUserData } from '../middleware/validateUser.ts'    
//, getUser, createUser, updateUsers, deleteUsers
const router:Router = Router()
/**
 * http://localhost:3002/Users
 */

router.get("/", (req:Request, res:Response)=> {
    console.log("vamos ok")
    getUsers(req, res)
})

router.get('/:id', getUser)
router.post('/', validateUserData, createUser)
router.put('/:id', updateUsers)
router.delete('/:id', deleteUsers)

export { router }
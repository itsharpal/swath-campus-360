/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AdminUsersController = () => import('#controllers/admin_users_controller')
const ComplaintsController = () => import('#controllers/complaints_controller')
const JobCardsController = () => import('#controllers/job_cards_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router.on('/').renderInertia('home', {}).as('home')

// router
//   .group(() => {
//     router.get('signup', [controllers.NewAccount, 'create'])
//     router.post('signup', [controllers.NewAccount, 'store'])

//     router.get('login', [controllers.Session, 'create'])
//     router.post('login', [controllers.Session, 'store'])
//   })
//   .use(middleware.guest())

// router
//   .group(() => {
//     router.post('logout', [controllers.Session, 'destroy'])
//   })
//   .use(middleware.auth())

router.get('/login', [AuthController, 'showLogin'])
router.post('/login', [AuthController, 'login'])

router.get('/register', [AuthController, 'showRegister'])
router.post('/register', [AuthController, 'register'])
router.get('/email/verify/:id', [AuthController, 'verifyEmail']).as('auth.verify_email')

router.post('/logout', [AuthController, 'logout']).use(middleware.auth())

router
  .group(() => {
    router.get('/users', [AdminUsersController, 'index']).as('admin.users.index')

    router.get('/users/create', [AdminUsersController, 'create']).as('admin.users.create')

    router.post('/users', [AdminUsersController, 'store']).as('admin.users.store')

    router.get('/users/:id', [AdminUsersController, 'show']).as('admin.users.show')

    router.get('/users/:id/edit', [AdminUsersController, 'edit']).as('admin.users.edit')

    router.put('/users/:id', [AdminUsersController, 'update']).as('admin.users.update')

    router.delete('/users/:id', [AdminUsersController, 'destroy']).as('admin.users.destroy')
  })
  .prefix('/admin')
// .middleware(middleware.auth())

// Complaints
router.get('/complaints', [ComplaintsController, 'index'])

router.get('/complaints/create', [ComplaintsController, 'create'])

router.get('/complaints/my', [ComplaintsController, 'my'])

router.get('/complaints/track/:code', [ComplaintsController, 'track'])

router.get('/complaints/:id/resolve', [ComplaintsController, 'showResolve'])

router.post('/complaints', [ComplaintsController, 'store'])

router.get('/complaints/:id', [ComplaintsController, 'show'])

router.put('/complaints/:id/status', [ComplaintsController, 'markInProgress'])

router.put('/complaints/:id/resolve', [ComplaintsController, 'resolve'])

//JOB CARDS
router.get('/job-cards', [JobCardsController, 'index'])

router.get('/job-cards/zone/:zoneId', [JobCardsController, 'zoneHistory'])

router.get('/job-cards/:id', [JobCardsController, 'show'])

router.put('/job-cards/:id/start', [JobCardsController, 'start'])

router.put('/job-cards/:id/complete', [JobCardsController, 'complete'])

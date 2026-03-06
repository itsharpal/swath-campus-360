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
const AnalyticsController = () => import('#controllers/analytics_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const ProfileController = () => import('../app/controllers/profile_controller.js')
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

router.get('/login', [AuthController, 'showLogin']).as('auth.show_login')
router.post('/login', [AuthController, 'login']).as('auth.login')

router.get('/register', [AuthController, 'showRegister']).as('auth.show_register')
router.post('/register', [AuthController, 'register']).as('auth.register')
router.get('/email/verify/:id', [AuthController, 'verifyEmail']).as('auth.verify_email')

router.post('/logout', [AuthController, 'logout']).use(middleware.auth()).as('auth.logout')
router.get('/profile', [ProfileController, 'show']).use(middleware.auth()).as('profile.show')

// Dashboards
router.get('/admin/dashboard', [DashboardController, 'admin']).use(middleware.auth())
router.get('/supervisor/dashboard', [DashboardController, 'supervisor']).use(middleware.auth())

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
  .middleware(middleware.auth())

// Complaints
router.get('/complaints', [ComplaintsController, 'index'])

router.get('/complaints/create', [ComplaintsController, 'create'])

router.get('/complaints/my', [ComplaintsController, 'my']).use(middleware.auth())

router.get('/complaints/track/:code', [ComplaintsController, 'track'])

router.get('/complaints/:id/resolve', [ComplaintsController, 'showResolve']).use(middleware.auth())

router.post('/complaints', [ComplaintsController, 'store'])

router.get('/complaints/:id', [ComplaintsController, 'show'])

router
  .put('/complaints/:id/status', [ComplaintsController, 'markInProgress'])
  .use(middleware.auth())

router.put('/complaints/:id/resolve', [ComplaintsController, 'resolve']).use(middleware.auth())

//JOB CARDS
router.get('/job-cards', [JobCardsController, 'index']).use(middleware.auth())

router.get('/job-cards/zone/:zoneId', [JobCardsController, 'zoneHistory']).use(middleware.auth())

router.get('/job-cards/:id', [JobCardsController, 'show']).use(middleware.auth())

router.put('/job-cards/:id/start', [JobCardsController, 'start']).use(middleware.auth())

router.put('/job-cards/:id/complete', [JobCardsController, 'complete']).use(middleware.auth())

// Analytics
router.get('/analytics/buildings', [AnalyticsController, 'buildings']).use(middleware.auth())

router.get('/analytics/supervisors', [AnalyticsController, 'supervisors']).use(middleware.auth())

router.get('/analytics/categories', [AnalyticsController, 'categories']).use(middleware.auth())

router.get('/analytics/heatmap', [AnalyticsController, 'heatmap']).use(middleware.auth())

router.get('/analytics/trends', [AnalyticsController, 'trends']).use(middleware.auth())

router.get('/analytics/peak-hours', [AnalyticsController, 'peakHours']).use(middleware.auth())

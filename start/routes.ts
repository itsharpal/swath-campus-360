/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
// import router from '@adonisjs/core/services/router'
// const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const BuildingsController = () => import('#controllers/buildings_controller')
const FloorsController = () => import('#controllers/floors_controller')
const ZonesController = () => import('#controllers/zones_controller')
const ComplaintsController = () => import('#controllers/complaints_controller')
const JobCardsController = () => import('#controllers/job_cards_controller')
const AnalyticsController = () => import('#controllers/analytics_controller')
const AdminDashboardController = () => import('#controllers/admin_dashboards_controller')
const ContractorDashboardController = () => import('#controllers/contractor_dashboards_controller')
const SupervisorDashboardController = () => import('#controllers/supervisor_dashboards_controller')
const ReportsController = () => import('#controllers/reports_controller')

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

router.post('/logout', [AuthController, 'logout']).use(middleware.auth())

// BUILDING ROUTES

router.group(() => {
  router.get('/buildings', [BuildingsController, 'index'])
  router.post('/buildings', [BuildingsController, 'store'])
  router.get('/buildings/:id', [BuildingsController, 'show'])
  router.put('/buildings/:id', [BuildingsController, 'update'])
  router.delete('/buildings/:id', [BuildingsController, 'destroy'])
  router.get('/buildings/:id/stats', [BuildingsController, 'stats'])
})

// FLOOR ROUTES

router.group(() => {
  router.get('/buildings/:buildingId/floors', [FloorsController, 'index'])
  router.post('/buildings/:buildingId/floors', [FloorsController, 'store'])
})

router.group(() => {
  router.put('/floors/:id', [FloorsController, 'update'])
  router.delete('/floors/:id', [FloorsController, 'destroy'])
})

// ZONE ROUTES

router.group(() => {
  router.get('/floors/:floorId/zones', [ZonesController, 'index'])
  router.post('/floors/:floorId/zones', [ZonesController, 'store'])
})

router.group(() => {
  router.get('/zones/:id', [ZonesController, 'show'])
  router.put('/zones/:id', [ZonesController, 'update'])
  router.delete('/zones/:id', [ZonesController, 'destroy'])
  router.get('/zones/:id/qr', [ZonesController, 'generateQr'])
})

router.get('/zones/by-qr/:qr', [ZonesController, 'resolveByQr'])

// COMPLAINT ROUTES

router.group(() => {
  router.get('/complaints', [ComplaintsController, 'index'])
  router.post('/complaints', [ComplaintsController, 'store'])
  router.get('/complaints/track/:code', [ComplaintsController, 'track'])
  router.get('/complaints/my', [ComplaintsController, 'myComplaints'])
  router.get('/complaints/:id', [ComplaintsController, 'show'])
  router.put('/complaints/:id/status', [ComplaintsController, 'markInProgress'])
  router.put('/complaints/:id/resolve', [ComplaintsController, 'resolve'])
})

// JOB CARDS ROUTES

router.group(() => {
  router.get('/job-cards', [JobCardsController, 'index'])
  router.get('/job-cards/:id', [JobCardsController, 'show'])
  router.put('/job-cards/:id/start', [JobCardsController, 'start'])
  router.put('/job-cards/:id/complete', [JobCardsController, 'complete'])
  router.get('/job-cards/zone/:zoneId', [JobCardsController, 'zoneHistory'])
})

// DASHBOARD ROUTES

router.group(() => {
  router.get('/dashboard/admin', [AdminDashboardController, 'index'])
  router.get('/dashboard/supervisor', [SupervisorDashboardController, 'index'])
  router.get('/dashboard/contractor', [ContractorDashboardController, 'index'])
})

// ANALYTICS ROUTES

router.group(() => {
  router.get('/analytics/buildings', [AnalyticsController, 'buildings'])
  router.get('/analytics/supervisors', [AnalyticsController, 'supervisors'])
  router.get('/analytics/categories', [AnalyticsController, 'categories'])
  router.get('/analytics/heatmap', [AnalyticsController, 'heatmap'])
  router.get('/analytics/trends', [AnalyticsController, 'trends'])
  router.get('/analytics/peak-hours', [AnalyticsController, 'peakHours'])
  router.get('/analytics/contractor/:id', [AnalyticsController, 'contractorMetrics'])
})

// REPORT ROUTES

router.group(() => {
  router.get('/reports/weekly', [ReportsController, 'weekly'])
  router.get('/reports/building/:id', [ReportsController, 'buildingReport'])
  router.get('/reports/contractor/:id', [ReportsController, 'contractorReport'])
})

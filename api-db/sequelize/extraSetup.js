export default function applyExtraSetup(sequelize) {
  const { user, project, takeoff, centerline } = sequelize.models
  
  user.hasMany(project)
  project.hasMany(takeoff)
  project.hasMany(centerline)

  project.belongsTo(user)
  takeoff.belongsTo(project)
  centerline.belongsTo(project)
}
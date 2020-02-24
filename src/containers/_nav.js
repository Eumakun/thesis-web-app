export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Visualization',
        to: '/visualization',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Data and User Management']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Graduate List',
        to: '/graduates',
        icon: 'cil-list'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'User List',
        to: '/users',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Education',
        route: '/base',
        icon: 'cilLayers',
        items: [
          {
            name: 'Courses',
            to: '/education/courses',
            // icon: 'cil-star'
          },
          {
            name: 'Schools',
            to: '/education/schools',
            // icon: 'cil-star'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Employment',
        route: '/employment',
        icon: 'cilFile',
        items: [
          {
            name: 'Job Types',
            to: '/employment/job_types',
            // icon: 'cil-star'
          },
          {
            name: 'Industries',
            to: '/employment/industries',
            // icon: 'cil-star'
          },
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Tier List']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Job Relevance Tier List',
        to: '/tiers',
        icon: 'cilLayers'
      },

    ]
  }
]
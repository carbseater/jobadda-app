export const cityOptions = [
  {
    id: 'Noida',
    name: 'Noida',
  },
  {
    id: 'Bhangel',
    name: 'Bhangel',
  },
  {
    id: 'Greater Noida',
    name: 'Greater Noida',
  },
  {
    id: 'Ghaziabad',
    name: 'Ghaziabad',
  },
];

export const workShift = [
  {id: 'nightShift', name: 'Night shift'},
  {id: 'dayShift', name: 'Day shift'},
];

export const sortOption = [
  {id: 'lowToHigh', name: 'Low to high salary'},
  {id: 'highToLow', name: 'High to low salary'},
];
export const genderOptions = [
  {
    id: 'male',
    name: 'Male',
  },
  {
    id: 'female',
    name: 'Female',
  },
  {
    id: 'others',
    name: 'Others',
  },
];
export const maritialOptions = [
  {
    id: 'married',
    name: 'Married',
  },
  {
    id: 'unmarried',
    name: 'Unmarried',
  },
  {
    id: 'divorced',
    name: 'Divorced',
  },
];

export const departments = [
  // Skilled Departments
  {
    id: 'manufacturing',
    name: 'Manufacturing and Production',
    jobs: [
      {
        id: 'welder',
        name: 'Welder',
      },
      {
        id: 'cnc_machinist',
        name: 'CNC Machinist',
      },
      {
        id: 'electrician',
        name: 'Electrician',
      },
      {
        id: 'tool_and_die_maker',
        name: 'Tool and Die Maker',
      },
      {
        id: 'industrial_mechanic',
        name: 'Industrial Mechanic',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering and Technical',
    jobs: [
      {
        id: 'software_engineer',
        name: 'Software Engineer',
      },
      {
        id: 'civil_engineer',
        name: 'Civil Engineer',
      },
      {
        id: 'mechanical_engineer',
        name: 'Mechanical Engineer',
      },
      {
        id: 'electronics_technician',
        name: 'Electronics Technician',
      },
      {
        id: 'quality_control_engineer',
        name: 'Quality Control Engineer',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    jobs: [
      {
        id: 'registered_nurse',
        name: 'Registered Nurse',
      },
      {
        id: 'radiology_technician',
        name: 'Radiology Technician',
      },
      {
        id: 'surgical_technologist',
        name: 'Surgical Technologist',
      },
      {
        id: 'pharmacist',
        name: 'Pharmacist',
      },
      {
        id: 'dental_hygienist',
        name: 'Dental Hygienist',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'it',
    name: 'Information Technology',
    jobs: [
      {
        id: 'software_developer',
        name: 'Software Developer',
      },
      {
        id: 'network_administrator',
        name: 'Network Administrator',
      },
      {
        id: 'database_administrator',
        name: 'Database Administrator',
      },
      {
        id: 'systems_analyst',
        name: 'Systems Analyst',
      },
      {
        id: 'cybersecurity_specialist',
        name: 'Cybersecurity Specialist',
      },
      // Add more job titles as needed
    ],
  },

  // Semi-Skilled Departments
  {
    id: 'logistics',
    name: 'Logistics',
    jobs: [
      {
        id: 'assembler',
        name: 'Assembler',
      },
      {
        id: 'line_worker',
        name: 'Line Worker',
      },
      {
        id: 'forklift_operator',
        name: 'Forklift Operator',
      },
      {
        id: 'packer',
        name: 'Packer',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'construction',
    name: 'Construction and Trades',
    jobs: [
      {
        id: 'carpenter',
        name: 'Carpenter',
      },
      {
        id: 'plumber',
        name: 'Plumber',
      },
      {
        id: 'electrician',
        name: 'Electrician',
      },
      {
        id: 'mason',
        name: 'Mason',
      },
      {
        id: 'welder',
        name: 'Welder',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'transportation',
    name: 'Transportation and Logistics',
    jobs: [
      {
        id: 'truck_driver',
        name: 'Truck Driver',
      },
      {
        id: 'warehouse_associate',
        name: 'Warehouse Associate',
      },
      {
        id: 'delivery_driver',
        name: 'Delivery Driver',
      },
      {
        id: 'material_handler',
        name: 'Material Handler',
      },
      {
        id: 'order_picker',
        name: 'Order Picker',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality and Service',
    jobs: [
      {
        id: 'chef_cook',
        name: 'Chef/Cook',
      },
      {
        id: 'waitstaff',
        name: 'Waitstaff',
      },
      {
        id: 'barista',
        name: 'Barista',
      },
      {
        id: 'housekeeper',
        name: 'Housekeeper',
      },
      {
        id: 'bartender',
        name: 'Bartender',
      },
      // Add more job titles as needed
    ],
  },

  // Unskilled Departments
  {
    id: 'general_labor',
    name: 'General Labor',
    jobs: [
      {
        id: 'laborer',
        name: 'Laborer',
      },
      {
        id: 'groundskeeper',
        name: 'Groundskeeper',
      },
      {
        id: 'cleaner',
        name: 'Cleaner',
      },
      {
        id: 'janitor',
        name: 'Janitor',
      },
      {
        id: 'farm_worker',
        name: 'Farm Worker',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'retail',
    name: 'Retail and Customer Service',
    jobs: [
      {
        id: 'cashier',
        name: 'Cashier',
      },
      {
        id: 'retail_sales_associate',
        name: 'Retail Sales Associate',
      },
      {
        id: 'stock_clerk',
        name: 'Stock Clerk',
      },
      {
        id: 'customer_service_representative',
        name: 'Customer Service Representative',
      },
      // Add more job titles as needed
    ],
  },
  {
    id: 'food_service',
    name: 'Food Service',
    jobs: [
      {
        id: 'dishwasher',
        name: 'Dishwasher',
      },
      {
        id: 'fast_food_crew',
        name: 'Fast Food Crew',
      },
      {
        id: 'food_prep_worker',
        name: 'Food Prep Worker',
      },
      {
        id: 'busser',
        name: 'Busser',
      },
      // Add more job titles as needed
    ],
  },
];

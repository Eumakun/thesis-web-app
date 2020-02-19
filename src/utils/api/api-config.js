const version = "v1";
/**
 * API routes mapping consuming the provided backend API.
 */
const api = {
  $children: {
    api: {
      //region API paths
      $prefix: `api`,
      $children: {
        //region Auth
        auth: {
          $prefix: "auth",
          login: {
            $url: "login",
            $method: "POST"
          },

        },
        //endregion Auth

        //region logout
        logout: {
          $url: "logout",
          $method: "GET"
        },
        //endregion logout

        //region logged in user
        user: {
          $url: "user",
          $method: "GET"
        },
        //endregion logged in user

        //region Auth
        users: {
          $prefix: "users",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          password: {
            $url: "password",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `password/${id}`)
          },
          delete: {
            $url: "",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },

        },
        //endregion Auth

        //region survey
        surveys: {
          $prefix: "survey",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          delete: {
            $url: "",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },

        },
        //endregion survey

        //region courses
        courses: {
          $prefix: "courses",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          delete: {
            $url: "",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },

        },
        //endregion courses

        //region schools
        schools: {
          $prefix: "schools",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          delete: {
            $url: "",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },

        },
        //endregion schools

        //region job types
        job_types: {
          $prefix: "job_types",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          delete: {
            $url: "",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },

        },
        //endregion job_types

        //region tiers
        tier: {
          $prefix: "tier",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          delete: {
            $url: "",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },

        },
        //endregion tiers

        //region industries
        industries: {
          $prefix: "industries",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
          create: {
            $url: "create",
            $method: "POST"
          },
          update: {
            $url: "update",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `update/${id}`)
          },
          delete: {
            $url: "",
            $method: "POST",
            $requires: ["id"],
            $format: Template(() => `delete/${id}`)
          },

        },
        //endregion industries

        //region dashboard
        dashboard: {
          $prefix: "dashboard",
          fetchAll: {
            $url: "",
            $method: "GET"
          },
        },
        //endregion dashboard

      }
    }
    //endregion API paths
  }
};

/**
 *Formats the passed callback to its full url path.
 *
 * @param {function} cb
 * return function
 */
function Template(cb) {
  return function (data) {
    const dataKeys = [];
    const dataVals = [];
    for (let key in data) {
      dataKeys.push(key);
      dataVals.push(data[key]);
    }
    let func = new Function(...dataKeys, "return (" + cb + ")();");
    return func(...dataVals);
  };
}

/**
 * Export const api for api-helper consumption.
 */
export {
  api
};

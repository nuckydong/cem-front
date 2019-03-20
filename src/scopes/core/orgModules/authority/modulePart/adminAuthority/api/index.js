const BASE_URL = "/org/authority/adminAuthorityManagementRestService/";
export default {

  queryAdmin(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAdminRoleByOrgId",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //根据条件查询组织类型
  // queryAdmin(_source, data, callBack){
  //   let submitParameter = {
  //     url: BASE_URL + "queryAdmin",
  //     data: data
  //   };
  //   _source.Base.submit(_source, submitParameter, {
  //     successCallback: function (data) {
  //       if (data.errors === null) {
  //         callBack(data);
  //       } else {
  //         for (let i = 0; i < data.errors.length; i++) {
  //           _source.$message.error(data.errors[i].msg);
  //         }
  //       }
  //     }
  //   });
  // },
  //授权或者回收管理员权限
  batchGrantOrRevokeAdminAuthority(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryCustomOrg",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //批量添加管理人员
  addBatchAdminUser(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addBatchRoleUsers",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //批量删除管理员
  deleteBatchAdmin(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchRole",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询组织
  queryAllTaOrg(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL+"queryCurrentAdminRoleWrapOrgTree",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //通过组织id查询人员信息
  queryBatchUserByOrgId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryUsersNoWraperByRoleId",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //删除管理员管理的人员信息
  deleteRoleUserByKey(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteRoleUserByKey",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //TODO 批量删除角色下人员信息
  deleteBatchRoleUsers(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchRoleUsers",
      data: data,
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  //使用权限查询
  queryAdminUsePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAdminUsePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  // queryAdminUsePermission(_source, data, callBack) {
  //   let submitParameter = {
  //     url: BASE_URL + "queryAdminUsePermission",
  //     data: data
  //   };
  //   _source.Base.submit(_source, submitParameter, {
  //     successCallback: function (data) {
  //       if (data.errors === null) {
  //         callBack(data);
  //       } else {
  //         for (let i = 0; i < data.errors.length; i++) {
  //           _source.$message.error(data.errors[i].msg);
  //         }
  //       }
  //     }
  //   });
  // },
  //对象使用权限查询
  queryAdminObjectUsePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAdminObjectUsePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //移除数据
  removeUsePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "removeUsePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },

  //查询授权权限
  queryAdminRepermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAdminRepermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询授权权限对象
  queryAdminRepermissionObject(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAdminRepermissionObject",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //移除授权权限
  removeRePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "removeRePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询组织权限
  queryOrgPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "selectOrgScope",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //移除组织权限
  removeOrgPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "removeOrgScope",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询使用组织全局权限
  queryAdminUsePermissionForGrant(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryAdminUsePermissionForGrant",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询所有授权权限数据
  queryGrantAuthority(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryGrantAuthority",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (!data.errors || data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  // //查询所有授权权限数据,更新后
  // queryGrantAuthority(_source, data, callBack) {
  //   let submitParameter = {
  //     url: BASE_URL + "queryGrantAuthority",
  //     data: data
  //   };
  //   _source.Base.submit(_source, submitParameter, {
  //     successCallback: function (data) {
  //       if (data.errors === null) {
  //         callBack(data);
  //       } else {
  //         for (let i = 0; i < data.errors.length; i++) {
  //           _source.$message.error(data.errors[i].msg);
  //         }
  //       }
  //     }
  //   });
  // },

  //查询所有授权对象权限数据,更新后
  queryGrantObjectAuthority(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryGrantObjectAuthority",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询所有的组织权限
  selectPermissionOrgScope(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "selectPermissionOrgScope",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //添加使用权限
  addUsePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addUsePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //添加授权权限
  addRePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addRePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //添加对象授权权限
  addRePermissionObject(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addRePermissionObject",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  addOrgPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "saveOrgScope",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询使用权限
  queryBatchPermissionTreeData(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryBatchPermissionTreeData",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //批量操作使用权限和对象使用权限
  batchChangeAdminPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "batchChangeAdminPermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //级联查询组织树信息,
  //TODO 后续需要进行更新数据
  queryCurrentAdminRoleWrapeOrgTree(_source, data, callBack) {
    let submitParameter = {
      url: "org/authority/roleAuthorityManagementRestService/queryCurrentAdminRoleWrapeOrgTree",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  addAdminRole(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addAdminRole",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  updateAdmin(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateAdmin",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  updateBatchAdminStatus(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateRoleEffectiveByRoleId",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //查询使用权限左侧菜单列表,
  queryUseSysPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryRootResource",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  queryUsePermissionByResourceId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryChildResourceByRoleId",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //保存管理员使用权限
  saveAdminUsePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "changeResourceUsePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  /**
   * 设置单个使用权限的有效期
   * @param _source
   * @param data
   * @param callBack
   */
  updateAdminUsePermissionEffectiveTime(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateUsePermissionEffectiveTime",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },

  /**
   * 批量设置使用权限有效期
   * @param _source
   * @param data
   * @param callBack
   */
  saveBatchAdminUsePermissionEffectiveTime(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateBatchUsePermissionEffectiveTime",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },


  //查询对象使用权限左侧菜单列表,
  queryObjectUseSysPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryRootCustomResource",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  queryObjectUsePermissionByResourceId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryChildCustomResourceByRoleId",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //保存管理员对象使用权限
  saveAdminObjectUsePermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "changeCustomResourceUsePermission",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  /**
   * 设置单个自定义使用权限的有效期
   * @param _source
   * @param data
   * @param callBack
   */
  updateAdminObjectUsePermissionEffectiveTime(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateCustomResourceUsePermissionEffectiveTime",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },

  /**
   * 批量设置自定义使用权限有效期
   * @param _source
   * @param data
   * @param callBack
   */
  updateBatchAdminObjectUsePermissionEffectiveTime(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "updateBatchCustomResourceUsePermissionEffectiveTime",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },

  //查询授权权限左侧菜单列表,
  queryGrantSysPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryRootResourceAuthority",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  queryGrantPermissionByResourceId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryChildResourceAuthorityByRoleId",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //保存管理员授权权限
  saveAdminGrantPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "changeResourceAuthority",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },


//查询对象授权权限左侧菜单列表,
  queryObjectGrantSysPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryRootCustomResourceAuthority",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  queryObjectGrantPermissionByResourceId(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "queryChildCustomResourceAuthorityByRoleId",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },
  //保存管理员对象授权权限
  saveAdminObjectGrantPermission(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "changeCustomResourceAuthority",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        if (data.errors === null) {
          callBack(data)
        } else {
          if (data.errors instanceof Array) {
            for (let i = 0; i < data.errors.length; i++) {
              _source.$message.error(data.errors[i].msg)
            }
          } else {
            _source.$message.error(data.errors)
          }
        }
      }
    })
  },

  //批量保存管理员人员角色关系
  addBatchUserRole(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "addBatchUserRole",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },
  //批量删除管理员人员角色关系
  deleteBatchUserRole(_source, data, callBack) {
    let submitParameter = {
      url: BASE_URL + "deleteBatchUserRole",
      data: data
    };
    _source.Base.submit(_source, submitParameter, {
      successCallback: function (data) {
        callBack(data)
      }
    })
  },


}

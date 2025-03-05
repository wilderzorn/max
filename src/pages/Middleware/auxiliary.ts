class Auxiliary {
  staticResources: Record<string, any>;
  staticDeptInfo: any;
  staticDeptNum: any;
  requestCache: any;
  temporaryData: object;
  constructor() {
    this.staticResources = {
      cftPointList: [
        {
          label: '全站有功发电总加',
          value: 'SUM_P',
        },
        {
          label: '35kV耀增线PT同期电压Ux',
          value: 'PT_ux',
        },
        {
          label: '35kV耀增线331开关A相电流',
          value: 'Ia',
        },
        {
          label: '35kV耀增线331开关B相电流',
          value: '331_Ib',
        },
        {
          label: '35kV耀增线331开关C相电流',
          value: '331_Ic',
        },
        {
          label: '35kV耀增线331开关有功功率',
          value: 'P',
        },
        {
          label: '35kV耀增线331开关无功功率',
          value: 'Q',
        },
        {
          label: '35kV耀增线331开关功率因数',
          value: '331_COS',
        },
        {
          label: '35kV A母线A相电压',
          value: '35A_V_a',
        },
        {
          label: '35kV A母线B相电压',
          value: '35A_V_b',
        },
        {
          label: '35kV A母线C相电压',
          value: '35A_V_c',
        },
        {
          label: '35kV A母线AB线电压',
          value: 'Uab',
        },
        {
          label: '35kV A母线BC线电压',
          value: 'Ubc',
        },
        {
          label: '35kV A母线CA线电压',
          value: 'Uca',
        },
        {
          label: '35kV A母线3Uo电压',
          value: '35A_V_u0',
        },
        {
          label: '35kV A母线频率',
          value: 'Fr',
        },
        {
          label: '35kV集电Ⅰ线311开关A相电流',
          value: '311_Ia',
        },
        {
          label: '35kV集电Ⅰ线311开关B相电流',
          value: '311_Ib',
        },
        {
          label: '35kV集电Ⅰ线311开关C相电流',
          value: '311_Ic',
        },
        {
          label: '35kV集电Ⅰ线311开关有功功率',
          value: '311_P',
        },
        {
          label: '35kV集电Ⅰ线311开关无功功率',
          value: '311_Q',
        },
        {
          label: '35kV集电Ⅰ线311开关功率因素',
          value: '311_COS',
        },
        {
          label: '35kV 1#SVG312开关A相电流',
          value: '312_Ia',
        },
        {
          label: '35kV 1#SVG312开关B相电流',
          value: '312_Ib',
        },
        {
          label: '35kV 1#SVG312开关C相电流',
          value: '312_Ic',
        },
        {
          label: '35kV 1#SVG312开关无功功率',
          value: '312_Q',
        },
        {
          label: '35kV 1#接地变313开关A相电流',
          value: '313_Ia',
        },
        {
          label: '35kV 1#接地变313开关B相电流',
          value: '313_Ib',
        },
        {
          label: '35kV 1#接地变313开关C相电流',
          value: '313_Ic',
        },
        {
          label: '35kV 1#接地变313开关有功功率',
          value: '313_P',
        },
        {
          label: '35kV 1#接地变313开关无功功率',
          value: '313_Q',
        },
        {
          label: '1路交流进线交流Uab',
          value: 'ZLP_1_Uab',
        },
        {
          label: '1路交流进线交流Ubc',
          value: 'ZLP_1_Ubc',
        },
        {
          label: '1路交流进线交流Uca',
          value: 'ZLP_1_Uca',
        },
        {
          label: '2路交流进线交流Uab',
          value: 'ZLP_2_Uab',
        },
        {
          label: '2路交流进线交流Ubc',
          value: 'ZLP_2_Ubc',
        },
        {
          label: '2路交流进线交流Uca',
          value: 'ZLP_2_Uca',
        },
        {
          label: '控母电压',
          value: 'ZLP_km_V',
        },
        {
          label: '合母电压',
          value: 'ZLP_hm_V',
        },
        {
          label: '负载电流',
          value: 'ZLP_fz_A',
        },
        {
          label: '电池组电压',
          value: 'ZLP_dc_V',
        },
        {
          label: '电池组电流',
          value: 'ZLP_dc_A',
        },
        {
          label: '正对地电压',
          value: 'ZLP_zdd_V',
        },
        {
          label: '负对地电压',
          value: 'ZLP_fdd_V',
        },
        {
          label: '交流屏交流1路Uab线电压',
          value: 'JLP_1_Uab',
        },
        {
          label: '交流屏交流1路Ubc线电压',
          value: 'JLP_1_Ubc',
        },
        {
          label: '交流屏交流1路Uca线电压',
          value: 'JLP_1_Uca',
        },
        {
          label: '交流屏交流1路A相电流',
          value: 'JLP_1_Ia',
        },
        {
          label: '交流屏交流1路B相电流',
          value: 'JLP_1_Ib',
        },
        {
          label: '交流屏交流1路C相电流',
          value: 'JLP_1_Ic',
        },
        {
          label: '交流屏交流2路Uab线电压',
          value: 'JLP_2_Uab',
        },
        {
          label: '交流屏交流2路Ubc线电压',
          value: 'JLP_2_Ubc',
        },
        {
          label: '交流屏交流2路Uca线电压',
          value: 'JLP_2_Uca',
        },
        {
          label: '交流屏交流2路A相电流',
          value: 'JLP_2_Ia',
        },
        {
          label: '交流屏交流2路B相电流',
          value: 'JLP_2_Ib',
        },
        {
          label: '交流屏交流2路C相电流',
          value: 'JLP_2_Ic',
        },
        {
          label: 'UPS1输出电压',
          value: 'UPS1_out_V',
        },
        {
          label: 'UPS1输出电流',
          value: 'UPS1_out_A',
        },
        {
          label: 'UPS2输出电压',
          value: 'UPS2_out_V',
        },
        {
          label: 'UPS2输出电流',
          value: 'UPS2_out_A',
        },
        {
          label: '接地电流',
          value: 'DZ_jd_A',
        },
        {
          label: '电阻温度',
          value: 'DZ_temp',
        },
        {
          label: '环境温度',
          value: 'temp',
        },
        {
          label: '环境湿度',
          value: 'DZ_hj_hum',
        },
      ],
    };
    this.staticDeptNum = '01001055';
    this.temporaryData = {};
    this.staticDeptInfo = {};
    this.requestCache = {}; // 缓存请求
  }
  hanldeStaticResources(arr) {
    arr.forEach((j) => {
      this.staticResources[j.name] = [...(j.list ?? [])];
    });
  }
  unpeteStaticDeptNum(deptNum, deptInfo) {
    this.staticDeptNum = deptNum;
    this.staticDeptInfo = deptInfo;
  }
  async fetchDataWithCache(key, fetchFunction) {
    if (this.requestCache[key]) {
      return await this.requestCache[key];
    }
    this.requestCache[key] = fetchFunction().then((data) => {
      delete this.requestCache[key];
      return data;
    });
    return await this.requestCache[key];
  }
  clear() {
    this.staticResources = {};
    this.staticDeptNum = '';
    this.temporaryData = {};
    this.staticDeptInfo = {};
    this.requestCache = {};
  }
}
const auxiliary = new Auxiliary();
export default auxiliary;

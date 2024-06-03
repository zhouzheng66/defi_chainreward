/*
 * @Author: zhouzheng66 2029054066@qq.com
 * @Date: 2024-06-04 02:05:09
 * @LastEditors: zhouzheng66 2029054066@qq.com
 * @LastEditTime: 2024-06-04 02:06:15
 * @FilePath: /defi_chainreward/frontend/web/src/data/dto/BaseDTO.ts
 * @Description: 用于创建和处理数据传输对象
 */
export class BaseDTO {
  holder: any = null;

  constructor(holder?: any) {
    this.holder = holder ?? null;
  }

  get isDTO(): boolean {
    return true;
  }

  static fillWith(data: any, holder?: BaseDTO): any {
    const obj: any = new this(holder ?? null);
    Object.keys(data).forEach((k) => {
      if (obj.hasOwnProperty(k)) {
        const privateKey = `_${k}Type`;
        const value = data[k];
        const privateTypeSet = obj[privateKey];
        if (privateTypeSet && value) {
          const cls = privateTypeSet.cls;
          const isMap = privateTypeSet.isMap;
          if (value instanceof Array) {
            const _v: any[] = [];
            value.forEach((v: any) => {
              if (v) {
                if (v["isDTO"]) {
                  _v.push(v);
                } else {
                  _v.push(cls.fillWith(v, obj));
                }
              }
            });
            Object.defineProperty(obj, k, {
              value: _v,
            });
          } else if (value instanceof Object) {
            if (isMap) {
              const keys: string[] = Object.keys(value);
              const _v: any = {};
              keys.forEach((key) => {
                _v[key] = cls.fillWith(value[key], obj);
              });
              Object.defineProperty(obj, k, {
                value: _v,
              });
            } else {
              Object.defineProperty(obj, k, {
                value: cls.fillWith(value, obj),
              });
            }
          } else {
            Object.defineProperty(obj, k, {
              value: value,
            });
          }
        } else {
          Object.defineProperty(obj, k, {
            value: value,
          });
        }
      }
    });

    return obj;
  }
}

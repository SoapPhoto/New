/**
 * 转换经纬坐标
 *
 * @export
 * @param {number} d
 * @param {number} f
 * @param {number} m
 * @returns
 */
export function changeToDu(d: number, f: number, m: number) {
  const c = Number.parseFloat(f.toString()) + Number.parseFloat((m / 60).toString())
  const du = Number.parseFloat((c / 60).toString()) + Number.parseFloat(d.toString())
  return du
}

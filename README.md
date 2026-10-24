# CCT 合约 DApp

QKI 主网 CCT 合约的中文前端，使用原生 HTML/CSS/JavaScript 与 ethers.js 6.15.0，无需构建。

## 功能

- 查询 CCT 总量、累计燃烧、全网算力与参与地址数。
- 连接注入式 EVM 钱包，或输入地址只读查询。
- 查询余额、算力、质押、冻结和领取资格。
- 领取奖励、燃烧 CCT、授权与质押、提取质押币。
- 转账前读取合约手续费，展示接收数量与额外总扣款。
- 绑定邀请人、冻结及解冻。
- 交易模拟、钱包确认、确认回执与浏览器链接。
- 支持自定义 HTTPS RPC，并核对链 ID 与代理实现地址。

## Gas Price

所有交易（含质押币授权）固定使用传统交易格式 `type: 0`，Gas Price 为 **500 Gwei**（`500000000000` wei）。模拟调用使用相同设置。实际手续费随 Gas 用量变化，Gas Limit 由钱包估算。若在钱包中手动修改交易参数，最终以上链交易为准。

## 本地运行

安装 Python 3，在仓库根目录运行：

```bash
python -m http.server 8080 --directory dist
```

打开 http://localhost:8080 。请通过 HTTP 服务访问，不能直接双击 index.html。

电脑可使用 MetaMask、OKX 等注入式 EVM 钱包；手机请使用钱包内置浏览器。

## 部署

将 `dist/` 目录部署到支持 HTTPS 的静态托管服务，无需安装 npm 依赖或执行构建。不要上传私钥、助记词或钱包凭据。

## 网络与合约

- 网络：QKI 主网
- Chain ID：20181205（0x133f0d5）
- 合约：`0xE8377eCb0F32f0C16025d5cF360D6C9e2EA66Adf`
- 已核对实现：`0xC16439DD044bC747aeB9b2d0958c3Cd13f9d5B6c`
- 默认 RPC：`https://hz.rpc.qkiscan.cn`
- 浏览器：https://scan.qki.dev/token/0xE8377eCb0F32f0C16025d5cF360D6C9e2EA66Adf

`dist/abi.json` 来自上述已验证实现。代理升级后需重新核对 ABI、业务规则和实现地址；前端会对未知实现暂停交易。RPC 可用性会变化，可在页面底部切换。

CCT 精度及质押币种、精度均从链上读取。算力按 CCT 精度显示，档位使用合约 isV1 / powerTierUnit 规则。领取会扣减算力；提取质押须距上次领取至少 24 小时。

## 源码结构

- `dist/index.html`：中文界面
- `dist/style.css`：响应式样式
- `dist/app.js`：钱包、RPC、查询和交易逻辑
- `dist/abi.json`：实现合约 ABI
- `dist/ethers.js`：本地附带的 ethers.js 6.15.0 ESM 依赖
- `THIRD_PARTY_LICENSES.txt`：第三方依赖许可证

## 验证范围

已验证 JavaScript 语法、主网只读查询、地址查询、燃烧算力预估和未检测到钱包的提示。未发送真实交易，钱包签名及真实交易回执需由使用者自行核对。所有资产操作由钱包确认，前端不保管私钥。

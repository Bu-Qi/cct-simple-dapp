// CCTMining: timestamp >= baseline + epoch(timestamp).
// epoch grows by one second per 365 elapsed seconds after mining starts.
export function nextClaimTimestamp(baseline, startTime) {
  let at = baseline + 86400n;
  if (startTime === 0n) return at;
  for (;;) {
    const next = baseline + 86400n + (at - startTime) / 365n;
    if (next === at) return at;
    at = next;
  }
}

export function estimateClaimTime(s) {
  if (!s?.q) return { at: null, note: '连接钱包或输入地址后，显示预计领取时间。' };
  if (!s.miningInitialized || !s.miningEnabled || s.miningMintStopped)
    return { at: null, note: '挖矿未开启，暂无法预计领取时间。' };
  if (s.p === 0n) return { at: null, note: '暂无算力，增加算力后可推算领取时间。' };
  if (s.v1 && s.st < s.anti_bot)
    return { at: null, note: '质押未达标；达标后合约会重新计时，暂无法预计。' };
  const baseline = [s.last, s.start_time, s.v1 ? s.antiBotChangedAt : 0n]
    .reduce((a, b) => a > b ? a : b);
  return { at: nextClaimTimestamp(baseline, s.start_time), note: '' };
}

export function formatCountdown(seconds) {
  seconds = Math.max(0, Math.floor(seconds));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds % 86400 / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const rest = seconds % 60;
  return (days ? days + '天 ' : '') + [hours, minutes, rest].map(n => String(n).padStart(2, '0')).join(':');
}

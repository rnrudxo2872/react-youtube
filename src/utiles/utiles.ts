export function getURLParams(url: string, key: string) {
  const result = new URLSearchParams(url).get(key);

  if (!result) throw new Error(`${key} is not Query Parameter.`);
  return result;
}

export function getLater(value: string | number) {
  const today = new Date();
  const timeValue = new Date(value);

  const seconds = Math.floor((today.getTime() - timeValue.getTime()) / 1000);
  if (seconds < 5) return "방금 전";
  if (seconds < 60) {
    return `${seconds}초 전`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);
  if (days < 31) {
    return `${days}일 전`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}달 전`;
  }

  return `${Math.floor(days / 365)}년 전`;
}

export function getFormattedCounts(count: number | string) {
  const arg = Number(count);

  const thousand = arg / 1000;
  if (thousand < 1) return `${arg}`;
  if (thousand < 10) return `${thousand.toFixed(1)}천`;
  return `${(thousand / 10).toFixed(1)}만`;
}

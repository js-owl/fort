const DEV_BUILD_TAG = /^dev-v\d+\.\d+\.\d+$/;

export function BuildTag() {
  const tag = process.env.NEXT_PUBLIC_CI_TAG?.trim();
  if (!tag || !DEV_BUILD_TAG.test(tag)) return null;

  return (
    <p
      className="pointer-events-none fixed right-3 bottom-3 z-40 text-xs text-white/40"
      data-ci-tag={tag}
    >
      {tag}
    </p>
  );
}

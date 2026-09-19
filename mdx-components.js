/**
 * Global MDX mapping. Visual styling lives in `.prose-body` in globals.css,
 * so these overrides only handle behaviour the CSS cannot: external links
 * opening safely in a new tab.
 */
export function useMDXComponents(components) {
  return {
    a: ({ href = '', ...props }) => {
      const isExternal = /^https?:/i.test(href);
      return (
        <a
          href={href}
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          {...props}
        />
      );
    },
    ...components,
  };
}

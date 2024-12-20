import { FieldTemplateProps } from "@rjsf/utils";

// component to allow html rendering of description, not finished yet

function CustomFieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    style,
    label,
    required,
    rawDescription, // Plain string description
    children,
    errors,
    help,
  } = props;

  // Debug log to check the type and value of description
  //console.log('Description type:', typeof description);
  console.log('Description value:', children.props.description);

  return (
    <div className={classNames} style={style}>
      {/* Render label only if it isn't already part of children */}
      {!children.props?.label && (
        <label htmlFor={id}>
          {label}
          {required ? "*" : null}
        </label>
      )}

      {/* Render rawDescription if it's not already part of children */}
      {!children.props?.description && rawDescription && (
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: rawDescription }}
        />
      )}

      {/* Render children, which include the form field */}
      {children}

      {/* Render errors and help */}
      {errors}
      {help}
    </div>
  );
}

export default CustomFieldTemplate;

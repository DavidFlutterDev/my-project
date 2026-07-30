export const redis = {
  id: 'column-5acd64e7-12bb-44f5-aa6d-16aa2955ff14',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-input',
          name: 'Input',
          layout: 'input',
          type: 'formField',
          properties: {
            id: 'input12',
            label: 'Key',
            floatLabel: 'auto',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            inputType: 'text',
            type: 'input',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            placeholder: 'Enter key',
            name: 'key',
            validationsList: ['required', 'minLength:3'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Type is required.',
              minLength: 'Min length should be 3.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClInputComponent',
          componentPropClassName: 'ClInputProperties',
          searchTags: ['Input', 'Text'],
          id: 'input_3',
        },
        {
          selector: 'cl-input',
          name: 'Input',
          layout: 'input',
          type: 'formField',
          properties: {
            id: 'input13',
            label: 'TTL',
            floatLabel: 'auto',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            inputType: 'number',
            type: 'input',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            placeholder: 'Duration in seconds',
            name: 'ttl',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Type is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClInputComponent',
          componentPropClassName: 'ClInputProperties',
          searchTags: ['Input', 'Text'],
          id: 'input_4',
        },
      ],
      id: 'form_2',
    },
  ],
};

const syncResponse_httpResponse = {
  id: 'column-9df15b65-a875-40b1-91a6-dbbf792e0fb6',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-select',
          name: 'Select',
          type: 'formField',
          layout: 'select',
          properties: {
            id: 'select1',
            label: 'Status',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            type: 'select',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            options: [
              {
                text: '200',
                value: '200',
              },
              {
                text: '201',
                value: '201',
              },
              {
                text: '204',
                value: '204',
                hidden: false,
              },
              {
                text: '301',
                value: '301',
                hidden: false,
              },
              {
                text: '302',
                value: '302',
                hidden: false,
              },
              {
                text: '304',
                value: '304',
                hidden: false,
              },
              {
                text: '400',
                value: '400',
                hidden: false,
              },
              {
                text: '401',
                value: '401',
                hidden: false,
              },
              {
                text: '403',
                value: '403',
                hidden: false,
              },
              {
                text: '404',
                value: '404',
                hidden: false,
              },
              {
                text: '405',
                value: '405',
                hidden: false,
              },
              {
                text: '408',
                value: '408',
                hidden: false,
              },
              {
                text: '409',
                value: '409',
                hidden: false,
              },
              {
                text: '429',
                value: '429',
                hidden: false,
              },
              {
                text: '500',
                value: '500',
                hidden: false,
              },
              {
                text: '502',
                value: '502',
                hidden: false,
              },
              {
                text: '503',
                value: '503',
                hidden: false,
              },
              {
                text: '504',
                value: '504',
                hidden: false,
              },
            ],
            placeholder: 'Enter status',
            name: 'status',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Status is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClSelectComponent',
          componentPropClassName: 'ClSelectProperties',
          searchTags: ['Select', 'Dropdown'],
          id: 'select_6',
        },
      ],
      id: 'form_5',
    },
  ],
};

const updareRunStatus = {
  id: 'column-2dad11d2-512f-402f-9b3a-5808f9bfa80b',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-select',
          name: 'Select',
          type: 'formField',
          layout: 'select',
          properties: {
            id: 'select0',
            label: 'Status',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            type: 'select',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            options: [
              {
                text: 'Failed',
                value: 'FAILED',
                selected: false,
              },
              {
                text: 'Success',
                value: 'SUCCESS',
                selected: false,
              },
            ],
            placeholder: 'Enter status',
            name: 'status',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Status is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClSelectComponent',
          componentPropClassName: 'ClSelectProperties',
          searchTags: ['Select', 'Dropdown'],
          id: 'select_1',
        },
      ],
      id: 'form_0',
    },
  ],
};

const dedupe = {
  id: 'page_7',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'cl-accordion',
      name: 'Accordion',
      layout: 'accordion',
      type: 'displayContainer',
      properties: {
        id: 'accordion38',
        hideToggle: true,
        openMultiple: false,
        type: 'accordion',
        style: {
          alignContent: '',
          justifyContent: '',
          contentWidth: 'w-full',
          iconCssClasses: 'icon-size-5',
          cssClasses: 'w-full flex-auto dense-mat-accordion',
          titleCssClasses: 'text-xl font-normal text-primary-800',
        },
        collapsedIcon: 'fss_icons:chevron-circle-down',
        expandedIcon: 'fss_icons:chevron-circle-up-filled',
        expansionPanelProperties: [
          {
            expansionPanelHeaderProperties: {
              label: 'Cache',
              panelOpenState: true,
              actionIcons: [],
              actionButtons: [],
            },
            expansionPanelContentProperties: [
              {
                id: 'column-bb04e903-f4ed-4dcb-a619-0c18972e4691',
                selector: 'div',
                name: 'Column',
                layout: 'column',
                type: 'container',
                hideDelete: true,
                import: '@clay/ui/components/container',
                properties: {
                  cssClass: 'flex w-full flex-col',
                },
                defaultProperties: {
                  cssClass:
                    'flex w-full flex-col border border-dashed rounded-md border-purple-400',
                },
                children: [
                  {
                    selector: 'form',
                    name: 'Form',
                    searchTags: ['Form'],
                    layout: 'form',
                    type: 'container',
                    import: '@clay/ui-components/containers',
                    style: {
                      cssClasses: 'grid w-full',
                    },
                    defaultProperties: {
                      cssClass:
                        'flex w-full border border-dashed rounded-md border-blue-400',
                    },
                    children: [
                      {
                        selector: 'cl-input',
                        name: 'Input',
                        layout: 'input',
                        type: 'formField',
                        properties: {
                          id: 'input25',
                          label: 'TTL',
                          floatLabel: 'auto',
                          appearance: 'fill',
                          subscriptSizing: 'fixed',
                          inputType: 'text',
                          type: 'input',
                          style: {
                            cssClasses: 'flex-auto w-full',
                            contentWidth: 'w-full',
                            justifyContent: '',
                            alignContent: '',
                          },
                          placeholder: 'Duration in seconds',
                          name: 'ttl',
                          validationsList: ['required'],
                          isReactiveFormControl: true,
                          errorsList: {
                            required: 'TTl is required.',
                          },
                        },
                        import: '@clay/ui-components/basic',
                        componentClassName: 'ClInputComponent',
                        componentPropClassName: 'ClInputProperties',
                        searchTags: ['Input', 'Text'],
                        id: 'input_18',
                      },
                      {
                        selector: 'cl-input',
                        name: 'Input',
                        layout: 'input',
                        type: 'formField',
                        properties: {
                          id: 'input26',
                          label: 'Key',
                          floatLabel: 'auto',
                          appearance: 'fill',
                          subscriptSizing: 'fixed',
                          inputType: 'text',
                          type: 'input',
                          style: {
                            cssClasses: 'flex-auto w-full',
                            contentWidth: 'w-full',
                            justifyContent: '',
                            alignContent: '',
                          },
                          placeholder: 'Enter key',
                          name: 'key',
                          validationsList: ['required'],
                          isReactiveFormControl: true,
                          errorsList: {
                            required: 'Key is required.',
                          },
                        },
                        import: '@clay/ui-components/basic',
                        componentClassName: 'ClInputComponent',
                        componentPropClassName: 'ClInputProperties',
                        searchTags: ['Input', 'Text'],
                        id: 'input_19',
                      },
                      {
                        selector: 'cl-checkbox',
                        name: 'Checkbox',
                        type: 'formField',
                        searchTags: ['Checkbox'],
                        layout: 'checkbox',
                        import: '@clay/ui-components/basic',
                        properties: {
                          id: 'checkbox0',
                          label: 'Drop on error',
                          type: 'checkbox',
                          style: {
                            cssClasses: '',
                            contentWidth: '',
                            alignContent: '',
                            justifyContent: '',
                            labelCssClasses: 'text-md',
                          },
                          checked: true,
                          name: 'ttl',
                          validationsList: [],
                          isReactiveFormControl: true,
                          errorsList: {},
                        },
                        componentClassName: 'ClCheckboxComponent',
                        componentPropClassName: 'ClCheckboxProperties',
                        id: 'checkbox_20',
                      },
                    ],
                    id: 'form_17',
                  },
                ],
              },
            ],
          },
        ],
      },
      import: '@clay/ui-components/containers',
      componentClassName: 'ClAccordionComponent',
      componentPropClassName: 'ClAccordionProperties',
      searchTags: ['Accordion', 'Expansion Panel', 'Expansion Panels'],
      id: 'accordion_16',
    },
  ],
};

const splitter = {
  id: 'page_10',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-select',
          name: 'Select',
          type: 'formField',
          layout: 'select',
          properties: {
            id: 'select0',
            label: 'Format',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            type: 'select',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            options: [
              {
                text: 'Csv',
                value: 'csv',
                selected: false,
              },
              {
                text: 'Json array',
                value: 'json_array',
                selected: false,
              },
              {
                text: 'Lines',
                value: 'lines',
                hidden: false,
                selected: false,
              },
              {
                text: 'Json map',
                value: 'json_map',
                hidden: false,
                selected: false,
              },
            ],
            placeholder: 'Select format',
            name: 'format',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Format is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClSelectComponent',
          componentPropClassName: 'ClSelectProperties',
          searchTags: ['Select', 'Dropdown'],
          id: 'select_12',
        },
      ],
      id: 'form_11',
    },
  ],
};

const dataValidator = {
  id: 'page_13',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-select',
          name: 'Select',
          type: 'formField',
          layout: 'select',
          properties: {
            id: 'select1',
            label: 'Schema',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            type: 'select',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            options: [],
            placeholder: 'Select schema',
            name: 'schema',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Schema is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClSelectComponent',
          componentPropClassName: 'ClSelectProperties',
          searchTags: ['Select', 'Dropdown'],
          id: 'select_15',
        },
      ],
      id: 'form_14',
    },
  ],
};

const blobLang = {
  id: 'page_13',
  name: 'Column',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  layout: 'page',
  actions: [],
  children: [
    {
      id: 'form_14',
      name: 'Form',
      type: 'container',
      style: { cssClasses: 'grid w-full' },
      import: '@clay/ui-components/containers',
      layout: 'form',
      children: [
        {
          id: 'input_2',
          name: 'Text Area',
          type: 'formField',
          import: '@clay/ui-components/basic',
          layout: 'textarea',
          selector: 'cl-textarea',
          properties: {
            id: 'input2',
            rows: '',
            type: 'textarea',
            name: 'expression',
            label: 'Expression',
            style: {
              cssClasses: 'flex-auto w-full',
              alignContent: '',
              contentWidth: 'w-full',
              justifyContent: '',
            },
            maxLength: 10000,
            minLength: 0,
            appearance: 'outline',
            showCounter: false,
            subscriptSizing: 'fixed',
            validationsList: ['required'],
            errorsList: { required: 'Expression is required.' },
            isReactiveFormControl: true,

          },
          searchTags: ['Text', 'Input', 'Text Area'],
          componentClassName: 'ClTextareaComponent',
          componentPropClassName: 'ClTextareaProperties'
        },
      ],
      selector: 'form',
      searchTags: ['Form'],
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
    },
  ],
  selector: 'div',
  properties: { cssClass: 'flex w-160 flex-col ', variables: [] },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
};

const csv_parser = {
  id: 'page_13',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-input',
          name: 'Input',
          layout: 'input',
          type: 'formField',
          properties: {
            id: 'input2',
            label: 'Delimiter',
            floatLabel: 'auto',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            inputType: 'text',
            type: 'input',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            placeholder: 'Enter delimiter',
            name: 'delimiter',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Delimiter is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClInputComponent',
          componentPropClassName: 'ClInputProperties',
          searchTags: ['Input', 'Text'],
          id: 'input_2',
        },
      ],
      id: 'form_14',
    },
  ],
};

const set_metadata = {
  id: 'page_13',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-input',
          name: 'Input',
          layout: 'input',
          type: 'formField',
          properties: {
            id: 'input2',
            label: 'Metadata name',
            floatLabel: 'auto',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            inputType: 'text',
            type: 'input',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            placeholder: 'Enter metadata name',
            name: 'metadata_name',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Name is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClInputComponent',
          componentPropClassName: 'ClInputProperties',
          searchTags: ['Input', 'Text'],
          id: 'input_2',
        },
        {
          selector: 'cl-input',
          name: 'Input',
          layout: 'input',
          type: 'formField',
          properties: {
            id: 'input4',
            label: 'Metadata field',
            floatLabel: 'auto',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            inputType: 'text',
            type: 'input',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            placeholder: 'Enter metadata field',
            name: 'metadata_field',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Field is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClInputComponent',
          componentPropClassName: 'ClInputProperties',
          searchTags: ['Input', 'Text'],
          id: 'input_3',
        },
      ],
      id: 'form_14',
    },
  ],
};

const throw_error = {
  id: 'page_13',
  selector: 'div',
  name: 'Column',
  layout: 'page',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  properties: {
    cssClass: 'flex w-160 flex-col ',
    variables: [],
  },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
  actions: [],
  children: [
    {
      selector: 'form',
      name: 'Form',
      searchTags: ['Form'],
      layout: 'form',
      type: 'container',
      import: '@clay/ui-components/containers',
      style: {
        cssClasses: 'grid w-full',
      },
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
      children: [
        {
          selector: 'cl-input',
          name: 'Input',
          layout: 'input',
          type: 'formField',
          properties: {
            id: 'input2',
            label: 'Message',
            floatLabel: 'auto',
            appearance: 'fill',
            subscriptSizing: 'fixed',
            inputType: 'text',
            type: 'input',
            style: {
              cssClasses: 'flex-auto w-full',
              contentWidth: 'w-full',
              justifyContent: '',
              alignContent: '',
            },
            placeholder: 'Enter message',
            name: 'message',
            validationsList: ['required'],
            isReactiveFormControl: true,
            errorsList: {
              required: 'Message is required.',
            },
          },
          import: '@clay/ui-components/basic',
          componentClassName: 'ClInputComponent',
          componentPropClassName: 'ClInputProperties',
          searchTags: ['Input', 'Text'],
          id: 'input_2',
        },
      ],
      id: 'form_14',
    },
  ],
};

const temp = {
  id: 'page_13',
  name: 'Column',
  type: 'containerPage',
  import: '@clay/ui/components/container',
  layout: 'page',
  actions: [],
  children: [
    {
      id: 'form_14',
      name: 'Form',
      type: 'container',
      style: { cssClasses: 'grid w-full' },
      import: '@clay/ui-components/containers',
      layout: 'form',
      children: [
        {
          id: 'input_2',
          name: 'Input',
          type: 'formField',
          import: '@clay/ui-components/basic',
          layout: 'input',
          selector: 'cl-input',
          properties: {
            id: 'input2',
            name: 'expression',
            type: 'input',
            label: 'Expression',
            style: {
              cssClasses: 'flex-auto w-full',
              alignContent: '',
              contentWidth: 'w-full',
              justifyContent: '',
            },
            inputType: 'text',
            appearance: 'fill',
            errorsList: { required: 'Expression is required.' },
            floatLabel: 'auto',
            placeholder: 'Enter expression',
            subscriptSizing: 'fixed',
            validationsList: ['required'],
            isReactiveFormControl: true,
          },
          searchTags: ['Input', 'Text'],
          componentClassName: 'ClInputComponent',
          componentPropClassName: 'ClInputProperties',
        },
      ],
      selector: 'form',
      searchTags: ['Form'],
      defaultProperties: {
        cssClass: 'flex w-full border border-dashed rounded-md border-blue-400',
      },
    },
  ],
  selector: 'div',
  properties: { cssClass: 'flex w-160 flex-col ', variables: [] },
  defaultProperties: {
    cssClass:
      'flex w-full flex-col border border-dashed rounded-md border-purple-400',
  },
};

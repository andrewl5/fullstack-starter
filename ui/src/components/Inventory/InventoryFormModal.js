import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import moment from 'moment'
import React from 'react'
import TextField from '../Form/TextField'
import { Field, Form, Formik } from 'formik'
import { number, object, string } from 'yup'

class InventoryFormModal extends React.Component {
  render() {
    const {
      title,
      formName,
      handleDialog,
      handleInventory,
      initialValues,
      productList,
      measurements,
    } = this.props
    const formSchema = object({
      name: string().required(),
      productType: string().required(),
      unitOfMeasurement: string().required(),
      averagePrice: number(),
      amount: number()
    })
    return (
      <Dialog
        open={this.props.isDialogOpen}
        maxWidth='sm'
        fullWidth={true}
        onClose={() => { handleDialog(false) }}
      >
        <Formik
          validationSchema={formSchema}
          initialValues={initialValues}
          onSubmit={values => {
            const dateMoment = moment(values.bestBeforeDate)
            const modifiedVals = { ...values, bestBeforeDate: dateMoment }
            handleDialog(true)
            handleInventory(modifiedVals)
          }}>
          { helpers =>
            <Form
              noValidate
              autoComplete='off'
              id={formName}
            >
              <DialogTitle id='alert-dialog-title'>
                {`${title} Inventory`}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true }}
                      name='name'
                      label='Name*'
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true }}
                      component={TextField}
                      select
                      name='productType'
                      label='Product Type*'
                    >
                      {productList.map((product) =>
                        <MenuItem value={product.name}>
                          {product.name}
                        </MenuItem>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='description'
                      label='Description'
                      component={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='averagePrice'
                      label='Average Price'
                      component={TextField}
                      type='number'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='amount'
                      label='Amount'
                      component={TextField}
                      type='number'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      component={TextField}
                      select
                      fullWidth
                      variant='outlined'
                      name='unitOfMeasurement'
                      label='Measurement Unit*'
                    >
                      {Object.keys(measurements).map((key) => {
                        const enumValue = measurements[key]
                        return (
                          <MenuItem key={key} value={key}>
                            {enumValue.abbreviation}
                          </MenuItem>
                        )
                      })}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      custom={{ variant: 'outlined', fullWidth: true, }}
                      name='bestBeforeDate'
                      component={TextField}
                      type='date'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      name='neverExpires'
                      type='checkbox'
                    />
                    Never Expires?
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDialog(false) }} color='secondary'>Cancel</Button>
                <Button
                  disableElevation
                  variant='contained'
                  type='submit'
                  form={formName}
                  color='secondary'
                  disabled={!helpers.dirty}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          }
        </Formik>
      </Dialog>
    )
  }
}

export default InventoryFormModal
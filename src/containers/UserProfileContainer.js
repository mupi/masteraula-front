import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import UserProfile from 'components/userprofile/UserProfile';
import {
  profileEdit, getCitiesList,
} from 'actions/profileEditAction';

const validate = (values) => {
  const errors = {};
  if (!values.name || values.name.length < 2) {
    errors.name = 'Insira um nome';
  }

  // if (values.userState !== 'NaN' && values.userCity === '0') {
  //   errors.userCity = 'Selecione a cidade';
  // }

  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state.session.session;

  return ({
    initialValues: {
      name: user.name,
      about: user.about,
      userState: user.city ? user.city.uf : null,
      userCity: user.city ? user.city.id : null,
    },
    user,
    stateList: state.profileEdit.stateList,
    isFetchingStatesList: state.profileEdit.isFetchingStatesList,
    cityList: state.profileEdit.cityList,
  });
};

const mapDispatchToProps = dispatch => ({
  getCitiesList: (idState, autoLoad) => dispatch(getCitiesList(idState, autoLoad)),

  onSubmit: (values) => {
    const profile = {
      name: values.name,
      about: values.about,
      city: values.userCity !== '0' ? values.userCity : null,
      profile_pic: values.profile_pic ? values.profile_pic : null,
    };
    return dispatch(profileEdit(profile));
  },
});

const UserPasswordProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm({
  form: 'profile',
  validate,
})(UserProfile));

export default UserPasswordProfileContainer;

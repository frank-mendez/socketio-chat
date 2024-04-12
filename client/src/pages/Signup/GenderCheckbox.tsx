import {GenderEnum} from "../../enums/gender.enum.ts";
import {UserSignupType} from "../../types/user-signup.ts";


type GenderCheckboxProps = {
    register: any,
};

const GenderCheckbox = ({register}: GenderCheckboxProps) => {
    return (
        <div className='flex mt-5'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Male</span>
                    <input
                        type='radio'
                        value={GenderEnum.MALE}
                        className='checkbox border-slate-900'
                        {...register('gender')}
                    />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Female</span>
                    <input
                        type='radio'
                        className='checkbox border-slate-900'
                        value={GenderEnum.FEMALE}
                        {...register('gender')}
                    />
                </label>
            </div>
        </div>
    );
};
export default GenderCheckbox;
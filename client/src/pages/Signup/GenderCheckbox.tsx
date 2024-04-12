import {GenderEnum} from "../../enums/gender.enum.ts";

type GenderCheckboxProps = {
    onChangeHandleCheckbox: (gender: GenderEnum) => void;
    gender: GenderEnum
};

const GenderCheckbox = ({onChangeHandleCheckbox, gender}: GenderCheckboxProps) => {
    return (
        <div className='flex mt-5'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Male</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={gender === GenderEnum.MALE}
                        onChange={() => onChangeHandleCheckbox(GenderEnum.MALE)}
                    />
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <span className='label-text'>Female</span>
                    <input
                        type='checkbox'
                        className='checkbox border-slate-900'
                        checked={gender === GenderEnum.FEMALE}
                        onChange={() => onChangeHandleCheckbox(GenderEnum.FEMALE)}
                    />
                </label>
            </div>
        </div>
    );
};
export default GenderCheckbox;
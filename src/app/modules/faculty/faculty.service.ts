/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { facultySearchableFields } from './faculty.constant';
import { Faculty } from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const getSingleFaculty = async (
  id: string
): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

// export const updateStudent = async (
//   id: string,
//   payload: Partial<IStudent>
// ): Promise<IStudent | null> => {
//   const isExist = await Student.findOne({ id });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found!!!');
//   }

//   const { name, guardian, localGuardian, ...studentData } = payload;

//   const updatedStudentData: Partial<IStudent> = { ...studentData };

//   // dynamically handling

//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}`;
//       (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }

//   if (guardian && Object.keys(guardian).length > 0) {
//     Object.keys(guardian).forEach(key => {
//       const guardianKey = `guardian.${key}`;
//       (updatedStudentData as any)[guardianKey] =
//         guardian[key as keyof typeof guardian];
//     });
//   }

//   if (localGuardian && Object.keys(localGuardian).length > 0) {
//     Object.keys(localGuardian).forEach(key => {
//       const localGuardianKey = `localGuardian.${key}`;
//       (updatedStudentData as any)[localGuardianKey] =
//         localGuardian[key as keyof typeof localGuardian];
//     });
//   }

//   const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
//     new: true,
//   });
//   return result;
// };

// export const deleteStudent = async (id: string): Promise<IStudent | null> => {
//   const result = await Student.findByIdAndDelete(id)
//     .populate('academicSemester')
//     .populate('academicDepartment')
//     .populate('academicFaculty');

//   return result;
// };

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  //   updateStudent,
  //   deleteStudent,
};

'use client'

import Image from "next/image";
import React, { useState, useTransition } from "react";
import "./style.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import logo from "@/assets/images/logo-login.png";
import { validateName, validatePassword } from "@/utils/validation.util";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "@/apis/auth/auth.apis";
import { FaSpinner } from "react-icons/fa";

interface FormValues {
  account: string;
  password: string;
}

export default function LoginAdminLayout() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    startTransition(async () => {
      const results = await login(data);

      if (results?.error) {
        toast.error(results.message);
      } else {
        toast.success(results.message);
        router.replace('/admin');
        reset();
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="container">
        <form className="main-form-content animate" onSubmit={handleSubmit(onSubmit)}>
          <div className="content-image">
            <Image
              src={logo}
              alt="Avatar"
            />
          </div>
          <div className="content-detail">
            <label htmlFor="uname">
              <b>Tài khoản</b>
            </label>
            <input
              className="account"
              type="text"
              placeholder="Nhập tài khoản"
              {...register("account", {
                required: "Tài khoản không được để trống",
                validate: {
                  invalidName: (value) =>
                    validateName(value) ||
                    "Tên tài khoản không hợp lệ",
                },
              })}
            />
            <small className="error">{errors.account?.message}</small>

            <label htmlFor="psw">
              <b>Mật khẩu</b>
            </label>
            <div className="password-content">
              <input
                className="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  validate: {
                    invalidPassword: (value) =>
                      validatePassword(value) ||
                      "Mật khẩu không hợp lệ",
                  },
                })}
              />
              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            <small className="error">{errors.password?.message}</small>

            <button className="submit-btn" type="submit" disabled={isPending}>
              {isPending ? (
                <FaSpinner className="spinner" />
              ) : (
                'Đăng nhập'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
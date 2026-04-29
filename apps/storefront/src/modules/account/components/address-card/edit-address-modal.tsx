"use client"

import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { Button, Heading, Text, clx } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import React, { useActionState, useEffect, useState } from "react"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "border p-6 min-h-[220px] h-full w-full flex flex-col justify-between transition-all",
          {
            "border-[#1e2b20] bg-[rgba(30,43,32,0.02)]": isActive,
            "border-[rgba(30,43,32,0.1)] bg-transparent": !isActive
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col gap-y-2">
          <h3
            className="text-lg font-medium"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
            data-testid="address-name"
          >
            {address.first_name} {address.last_name}
          </h3>
          {address.company && (
            <p
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: "#c9a84c" }}
              data-testid="address-company"
            >
              {address.company}
            </p>
          )}
          <div className="flex flex-col text-sm font-light mt-2" style={{ color: "#4a5e4c", lineHeight: "1.6" }}>
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-6 mt-6 pt-4" style={{ borderTop: "1px solid rgba(30,43,32,0.06)" }}>
          <button
            className="label-caps flex items-center gap-x-2 transition-opacity hover:opacity-60"
            style={{ color: "#1e2b20", fontSize: "10px" }}
            onClick={open}
            data-testid="address-edit-button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Düzenle
          </button>
          
          {isDeleting ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium" style={{ color: "rgb(220,38,38)" }}>Emin misiniz?</span>
              <button
                className="label-caps px-2 py-1 transition-colors hover:bg-red-600 hover:text-white"
                style={{ background: "rgb(220,38,38)", color: "#fff", fontSize: "9px" }}
                onClick={removeAddress}
              >
                {removing ? "..." : "Evet"}
              </button>
              <button
                className="label-caps px-2 py-1 transition-colors"
                style={{ background: "transparent", border: "1px solid rgba(30,43,32,0.2)", color: "#1e2b20", fontSize: "9px" }}
                onClick={() => setIsDeleting(false)}
              >
                İptal
              </button>
            </div>
          ) : (
            <button
              className="label-caps flex items-center gap-x-2 transition-opacity hover:opacity-60"
              style={{ color: "rgb(220,38,38)", fontSize: "10px" }}
              onClick={() => setIsDeleting(true)}
              data-testid="address-delete-button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              Sil
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>Adresi Düzenle</h2>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="Ad"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label="Soyad"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Şirket (İsteğe bağlı)"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
                data-testid="company-input"
              />
              <Input
                label="Adres"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />
              <Input
                label="Daire, Kat vb."
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Posta Kodu"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                  data-testid="postal-code-input"
                />
                <Input
                  label="Şehir"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                  data-testid="city-input"
                />
              </div>
              <Input
                label="İlçe / Eyalet"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
                data-testid="state-input"
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />
              <Input
                label="Telefon"
                name="phone"
                autoComplete="tel"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div className="p-3 mt-4 text-sm font-light flex items-center gap-2" style={{ background: "rgba(220,38,38,0.05)", color: "rgb(185,28,28)", border: "1px solid rgba(220,38,38,0.2)" }}>
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-8 items-center justify-end">
              <button
                type="reset"
                onClick={close}
                className="label-caps px-6 py-3 transition-colors"
                style={{ background: "transparent", color: "#1e2b20", border: "1px solid rgba(30,43,32,0.2)" }}
                data-testid="cancel-button"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="label-caps px-8 py-3 transition-opacity hover:opacity-80"
                style={{ background: "#1e2b20", color: "#f5f0e8" }}
                data-testid="save-button"
              >
                Güncelle
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
